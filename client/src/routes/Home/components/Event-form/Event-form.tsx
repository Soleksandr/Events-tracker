import React from "react";
import TextField from "shared-components/form/Text-field";
import { IEvent } from "sdk/models";
import { Formik, Field } from "formik";
import { MonthsField } from "./Months";
import { WeekDaysField } from "./WeekDays";
import { MonthDaysField } from "./MonthDays";
import { Modal } from "shared-components/Modal";
import { WeeksInAMonthField } from "./WeeksInAMonth";
import { Picker } from "shared-components/form/DataTimePicker";
import { CheckboxField } from "shared-components/form/Checkbox";

interface IEventForm {
  isEventFormOpen: boolean;
  closeEventForm: () => any;
  createEvent: (data: IEvent) => any;
}

export const EventForm = ({ isEventFormOpen, closeEventForm, createEvent }: IEventForm) => {
  const submitForm = (handleSubmit: any) => (e: React.FormEvent<HTMLInputElement>) => {
    closeEventForm();
    handleSubmit(e);
  };


  const initialValues: IEvent = {
    description: "",
    // eventStartDate: null,
    isDailyEvent: false,
    eventTime: null,
    weekDays: [],
    weeksInAMonth: [],
    months: [],
    monthDays: [],
    onceInAYearNumber: 1,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={createEvent}
      render={({ handleSubmit, values }) => (
        <Modal open={isEventFormOpen}
          onCancel={closeEventForm}
          onOk={submitForm(handleSubmit)}
          maxWidth="xs"
          title="Create Event"
        >
          <form>
            <Field name="description"
              multiline
              fullWidth
              component={TextField}
              margin="normal"
              label="Event Description"
            />
            {/* <Field
              autoOk
              name="eventStartDate"
              pickerType="date"
              margin="normal"
              disablePast
              fullWidth
              disableFuture={false}
              label="Event start date"
              component={Picker}
            /> */}
            <Field
              autoOk
              name="eventTime"
              pickerType="time"
              margin="normal"
              disablePast
              fullWidth
              disableFuture={false}
              label="*Event time"
              component={Picker}
            />
            <Field name="isDailyEvent"
              label="Daily event"
              margin="normal"
              component={CheckboxField}
            />
            {
              !values.isDailyEvent &&
              <>
                <Field name="weekDays"
                  component={WeekDaysField}
                  disabled={Boolean(values.monthDays.length)}
                />
                <Field name="weeksInAMonth"
                  component={WeeksInAMonthField}
                  disabled={!values.weekDays.length}
                />
                <Field name="months"
                  component={MonthsField}
                />
                <Field name="monthDays"
                  component={MonthDaysField}
                  disabled={Boolean(values.weekDays.length)}
                />
                <Field name="onceInAYearNumber"
                  type="number"
                  fullWidth
                  component={TextField}
                  margin="normal"
                  label="Once in a year number"
                />
              </>
            }
          </form>
        </Modal>
      )}
    />
  );
};