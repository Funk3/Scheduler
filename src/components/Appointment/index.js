import React from 'react';
import useVisualMode from 'hooks/useVisualMode';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  // Transition Views
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const EDITING = 'EDITING';
  const CONFIRMING = 'CONFIRMING';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  // Save an appointment
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    props
      .bookInterview(props.id, interview)
      .then((response) => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }

  // Delete an appointment
  function deleting() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  }

  function edit() {
    transition(EDITING);
  }

  function confirmation() {
    transition(CONFIRMING);
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article data-testid='appointment' className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            return transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => confirmation()}
          onEdit={() => {
            edit();
          }}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === CONFIRMING && (
        <Confirm
          onConfirm={() => deleting()}
          onCancel={back}
          message='Are you sure you want to delete?'
        />
      )}
      {mode === EDITING && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message='There was an error saving your appointment'
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message='There was an error deleting your appointment'
          onClose={back}
        />
      )}
    </article>
  );
}
