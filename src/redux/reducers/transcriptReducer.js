import {
  TRANSCRIPT_GET,
  TRANSCRIPT_GET_TAKEN_COURSES,
  TRANSCRIPT_CREATE,
} from "../constants/transcriptConstants";

export const transcriptReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSCRIPT_GET:
      return { transcript: action.payload };
    case TRANSCRIPT_GET_TAKEN_COURSES:
      return { courses_taken: action.payload };
    case TRANSCRIPT_CREATE:
      return { transcript_create: action.payload };
    default:
      return state;
  }
};
