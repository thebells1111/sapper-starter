import mongoose from 'mongoose';

export const TimesheetSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    userID: {
      type: String,
    },
    date: {
      type: Date,
    },
    jobHrs: {
      type: Array,
    },
    jobNames: [
      {
        type: String,
        uppercase: true,
      },
    ],
  },
  { collection: 'estimators' }
);

export const Timesheet = mongoose.model('Timesheet', TimesheetSchema);
