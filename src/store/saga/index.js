import {
    CallEffect,
    delay,
    put,
    PutEffect,
    takeLatest
} from "redux-saga/effects";
import { Actions } from "../actions/actions";
import { setSnake,setDisDirection,increaseSnake } from "../slices/counterslice";
import { difficulty } from "../../utilities/difficulty";
const  {
    DOWN,
    ISnakeCoord,
    LEFT,
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
    MOVE_UP, 
    RIGHT,
    setDisDirection__,
    UP,
    INCREASE_SNAKE,
    END_GAME,
    RESET_GAME
   
} = Actions;
  
  export function* moveSaga(params){
   
    while (params.type !== END_GAME && params.type !==RESET_GAME) {
      yield put(setSnake({
        type: params.type.split("_")[1],
        payload: params.payload,
      }));
      switch (params.type.split("_")[1]) {
        case RIGHT:
          yield put(setDisDirection({ type: "SET_DIS_DIRECTION", payload: LEFT }));
          break;
  
        case LEFT:
          yield put(setDisDirection({ type: "SET_DIS_DIRECTION", payload:  RIGHT}));
          break;
  
        case UP:
          yield put(setDisDirection({ type: "SET_DIS_DIRECTION", payload: DOWN }));
          break;
  
        case DOWN:
          yield put(setDisDirection({ type: "SET_DIS_DIRECTION", payload: UP }));
          break;
        
        default:
          break;
      }
      yield delay(difficulty);
    }
  }
  
  function* watcherSagas() {
    yield takeLatest(
      [MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN,END_GAME,RESET_GAME],
      moveSaga
    );
  }
  
  export default watcherSagas;