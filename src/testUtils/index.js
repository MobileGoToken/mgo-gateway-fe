// @flow
import SagaTester from 'redux-saga-tester';
import { put } from 'redux-saga/effects';
import _ from 'lodash';

export const createErrorWithMixedObject = (
  message: string,
  mixObject: Object,
) => {
  const errorMock = new Error(message);

  Object.entries(mixObject).forEach(([key, val]) => {
    // $FlowIssue
    errorMock[key] = val;
  });

  return errorMock;
};

// this code snippet serializes the output of the generated snapshot
// for easier lookup.
expect.addSnapshotSerializer({
  test: ({ type }) => type === 'saga_result',
  print: ({ path, testName, mocksOptObj, payload, state }) => `
Test name: ${testName}
Saga state: ${JSON.stringify(state, null, 2)}
Action payload: ${JSON.stringify(payload, null, 2)}
${
    path.length
      ? `Saga yield path:
${path.map(val => `${JSON.stringify(val, null, 2)}`).join('\n')}`
      : ''
  }
${
    mocksOptObj && mocksOptObj.list.length
      ? `Mocks opts:
${_.flatten(
          mocksOptObj.list.map(({ list, name }) =>
            list.map(
              ({ funcName, args }) =>
                `${name}.${funcName}(${args
                  .map(arg => JSON.stringify(arg, null, 2))
                  .join(', ')})`,
            ),
          ),
        ).join('\n')}`
      : ''
  }`,
});

export const testSaga = ({
  state,
  testName,
  moduleMocks,
  getSaga,
  postProcessCalledActions = id => id,
  expectedFinalAction,
}: {
  state: Object,
  testName: string,
  moduleMocks: Array<{
    path: string,
    recordedMock: {
      name: string,
      mock: any,
      getOpsList: Function,
    },
  }>,
  getSaga: Function,
  postProcessCalledActions?: Function,
  expectedFinalAction?: Object,
}) => {
  test(testName, async () => {
    moduleMocks.forEach(({ path, recordedMock }) => {
      jest.doMock(path, () => recordedMock.mock);
    });

    const { saga, payload } = getSaga();
    const endActionType = '@@END_ACTION';
    const endAction = {
      type: endActionType,
    };

    function* endActionWrapperSaga(): Generator<*, *, *> {
      yield saga({ payload });
      if (!expectedFinalAction) {
        yield put(endAction);
      }
    }

    const sagaTester = new SagaTester({
      initialState: state,
    });

    sagaTester.start(endActionWrapperSaga);

    const finalAction = await sagaTester.waitFor(
      expectedFinalAction ? expectedFinalAction.type : endAction.type,
    );

    expect({
      type: 'saga_result',
      testName,
      state,
      payload,
      path: postProcessCalledActions(
        sagaTester
          .getCalledActions()
          .filter(action => action.type !== endActionType),
      ),
      mocksOptObj: {
        list: moduleMocks.map(({ recordedMock }) => ({
          name: recordedMock.name,
          list: recordedMock.getOpsList(),
        })),
      },
    }).toMatchSnapshot();

    if (expectedFinalAction) {
      expect(expectedFinalAction).toEqual(finalAction);
    }
  });
};

export const testReducer = ({
  testName,
  moduleMocks = [],
  getState = f => f,
  getReducer = f => f,
  expectedActions = {},
}) => {
  moduleMocks.forEach(({ path, recordedMock }) => {
    jest.doMock(path, () => recordedMock.mock);
  });

  const actionTypes = Object.keys(expectedActions);
  const state = getState();
  const reducer = getReducer();

  actionTypes.forEach(actionType => {
    test(`${testName} - ${actionType}`, () => {
      const { expectedStateDiff, payload } = expectedActions[actionType];
      const result = reducer(state, { type: actionType, payload });

      if (expectedStateDiff) {
        const stateDiff =
          typeof expectedStateDiff === 'function'
            ? expectedStateDiff(state)
            : expectedStateDiff;

        expect(result).toEqual({ ...state, ...stateDiff });
      } else {
        expect(result).toMatchSnapshot();
      }
    });
  });
};

function convertMockObjectToRecorderMockObject({
  prefix = '',
  mockObject,
  opsList,
}: {
  prefix?: string,
  mockObject: Object | Function,
  opsList: Array<*>,
}) {
  return Object.entries(mockObject)
    .map(([funcName, objectOrFunc]) => {
      if (typeof objectOrFunc === 'function') {
        /* eslint-disable */
        const clonedFunction = function(...args) {
          opsList.push({
            funcName: prefix ? `${prefix}.${funcName}` : funcName,
            args,
          });

          return objectOrFunc(...args);
        };
        /* eslint-enable */

        Object.entries(objectOrFunc).forEach(([key, value]) => {
          clonedFunction[key] = value;
        });

        return [funcName, clonedFunction];
      } else if (typeof objectOrFunc === 'object') {
        return [
          funcName,
          convertMockObjectToRecorderMockObject({
            prefix: `${prefix}${funcName}`,
            mockObject: objectOrFunc,
            opsList,
          }),
        ];
      }

      return [funcName, objectOrFunc];
    })
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

export const createRecordingMock = (mockObject: Object) => {
  const opsList = [];
  const mock = convertMockObjectToRecorderMockObject({
    mockObject: mockObject.mock,
    opsList,
  });

  return {
    name: mockObject.name,
    mock,
    getOpsList: () => opsList,
  };
};
