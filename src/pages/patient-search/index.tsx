import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, message } from 'antd';
import { useHistory } from 'react-router-dom';

import {
  BackgroundContext,
  defaultBackgroundState,
} from '../../context/background';
import { getItem, getItems } from '../../services/api';
import { monthDayYear, yearMonthDay } from '../../utils/dates';
import { idGenerator } from '../../utils/patient';
import { Store } from 'antd/lib/form/interface';
import {
  Item,
  ItemType,
  MetricItem,
  MetricState,
  PatientBackground,
} from '../../utils/types';
import {
  ConditionsContext,
  defaultConditionsState,
} from '../../context/conditions';
import { defaultMetricState, MetricsContext } from '../../context/metrics';
import { defaultNotesState, NotesContext } from '../../context/notes';
import { clearStorage } from '../../utils/data';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

function PatientSearch(): JSX.Element {
  // todo -> all data should be pulled at once. this should be a util

  const [form] = Form.useForm();
  // const history = useHistory();
  // const backgroundCtx = useContext(BackgroundContext);
  // const conditionsCtx = useContext(ConditionsContext);
  // const metricsCtx = useContext(MetricsContext);
  // const notesCtx = useContext(NotesContext);

  const onReset = () => form.resetFields();
  const onFinishFailed = () => null;
  const onFinish = () => {
    console.log(42);
    // const birthdate = data.birthdate.format(yearMonthDay);

    //   const item: Item = {
    //     id,
    //     key: 'background',
    //   };
  };
  // const onFinish = (data: Store) => {
  //   const { firstName, lastName } = data;
  //   const birthdate = data.birthdate.format(yearMonthDay);
  //   const id = idGenerator(birthdate, firstName, lastName);
  //   const item: Item = {
  //     id,
  //     key: 'background',
  //   };

  //   // todo types
  //   // getItem(item).then((res: any) => {
  //   //   if (res?.statusCode === 200) {
  //   //     // todo -> this should be a hook or util
  //   //     clearStorage();
  //   //     backgroundCtx.update(defaultBackgroundState);
  //   //     conditionsCtx.update(defaultConditionsState);
  //   //     metricsCtx.update(defaultMetricState);
  //   //     notesCtx.update(defaultNotesState);

  //   //     backgroundCtx.update(res);
  //   //     message.success('Patient Found');
  //   //     history.push('/dashboard');
  //   //   } else message.warn('Patient Not Found');
  //   // });
  //   // TODO Refactor
  //   getItems({ id }).then((res: any) => {
  //     if (res?.statusCode === 200) {
  //       console.log(res);
  //       clearStorage();
  //       backgroundCtx.update(defaultBackgroundState);
  //       conditionsCtx.update(defaultConditionsState);
  //       metricsCtx.update(defaultMetricState);
  //       notesCtx.update(defaultNotesState);

  //       let background: PatientBackground = defaultBackgroundState;
  //       const metrics: MetricState = defaultMetricState;
  //       res.map((item: any) => {
  //         switch (item.type) {
  //           case ItemType.BACKGROUND:
  //             background = item;
  //             break;
  //           case ItemType.METRIC:
  //             // metrics.push(item);
  //             break;
  //         }
  //       });
  //       backgroundCtx.update(background);
  //       metricsCtx.update(metrics);

  //       message.success('Patient Found');
  //       history.push('/dashboard');
  //     } else message.warn('Patient Not Found');
  //   });
  // };

  return (
    <>
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Birthdate"
          name="birthdate"
          rules={[{ required: true, message: 'Birthdate is required.' }]}
        >
          <DatePicker format={monthDayYear} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button className="submit-btn" type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default PatientSearch;
