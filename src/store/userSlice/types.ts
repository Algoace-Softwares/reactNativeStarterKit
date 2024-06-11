/*
 ** User slice type
 */

export interface userState {
  bears: number;
}
export interface userSlice extends userState {
  addBear: () => void;
}
