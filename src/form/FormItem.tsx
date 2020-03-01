import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import Animate from 'rc-animate';
import omit from 'omit.js';
import Row from 'antd/lib/grid/row';
import Col, { ColProps } from 'antd/lib/grid/col';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';
import warning from '../_util/warning';
import { tuple } from '../_util/types';
import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants';
import FormContext, { FormContextProps } from './context';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  LoadingOutlined,
} from '@ant-design/icons';

const ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');

const FormLabelAligns = tuple('left', 'right');

export type FormLabelAlign = typeof FormLabelAligns[number];

export interface FormItemProps {
  prefixCls?: string;
  className?: string;
  id?: string;
  htmlFor?: string;
  label?: React.ReactNode;
  labelAlign?: FormLabelAlign;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  help?: React.ReactNode;
  extra?: React.ReactNode;
  validateStatus?: typeof ValidateStatuses[number];
  hasFeedback?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  colon?: boolean;
}

function intersperseSpace<T>(list: T[]): (T | string)[] {
  return list.reduce((current, item) => [...current, ' ', item], []).slice(1);
}

export default class FormItem extends React.Component<FormItemProps, any> {
  helpShow = false;

  static defaultProps = {
    hasFeedback: false,
  };

  componentDidMount() {
    const { children, help, validateStatus, id } = this.props;
    warning(
      this.getControls(children, true).length <= 1 ||
        help !== undefined ||
        validateStatus !== undefined,
      'Form.Item',
      'Cannot generate `validateStatus` and `help` automatically, ' +
        'while there are more than one `getFieldDecorator` in it.',
    );

    warning(
      !id,
      'Form.Item',
      '`id` is deprecated for its label `htmlFor`. Please use `htmlFor` directly.',
    );
  }

  getHelpMessage() {
    const { help } = this.props;
    if (help === undefined && this.getOnlyControl()) {
      const { errors } = this.getField();
      if (errors) {
        return intersperseSpace(
          errors.map((e: any, index: number) => {
            let node: React.ReactElement<any> | null = null;

            if (React.isValidElement(e)) {
              node = e;
            } else if (React.isValidElement(e.message)) {
              node = e.message;
            }
            // eslint-disable-next-line react/no-array-index-key
            return node ? React.cloneElement(node, { key: index }) : e.message;
          }),
        );
      }
      return '';
    }
    return help;
  }

  getControls(children: React.ReactNode, recursively: boolean) {
    let controls: React.ReactElement<any>[] = [];
    const childrenArray = React.Children.toArray(children);
    for (let i = 0; i < childrenArray.length; i += 1) {
      if (!recursively && controls.length > 0) {
        break;
      }

      const child = childrenArray[i] as React.ReactElement<any>;
      if (
        child.type &&
        ((child.type as any) === FormItem ||
          (child.type as any).displayName === 'FormItem')
      ) {
        continue;
      }
      if (!child.props) {
        continue;
      }
      if (FIELD_META_PROP in child.props) {
        // And means FIELD_DATA_PROP in child.props, too.
        controls.push(child);
      } else if (child.props.children) {
        controls = controls.concat(
          this.getControls(child.props.children, recursively),
        );
      }
    }
    return controls;
  }

  getOnlyControl() {
    const child = this.getControls(this.props.children, false)[0];
    return child !== undefined ? child : null;
  }

  getChildProp(prop: string) {
    const child = this.getOnlyControl() as React.ReactElement<any>;
    return child && child.props && child.props[prop];
  }

  getId() {
    return this.getChildProp('id');
  }

  getMeta() {
    return this.getChildProp(FIELD_META_PROP);
  }

  getField() {
    return this.getChildProp(FIELD_DATA_PROP);
  }

  getValidateStatus() {
    const onlyControl = this.getOnlyControl();
    if (!onlyControl) {
      return '';
    }
    const field = this.getField();
    if (field.validating) {
      return 'validating';
    }
    if (field.errors) {
      return 'error';
    }
    const fieldValue =
      'value' in field ? field.value : this.getMeta().initialValue;
    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
      return 'success';
    }
    return '';
  }

  // Resolve duplicated ids bug between different forms
  // https://github.com/ant-design/ant-design/issues/7351
  onLabelClick = () => {
    const id = this.props.id || this.getId();
    if (!id) {
      return;
    }

    const formItemNode = ReactDOM.findDOMNode(this) as Element;
    const control = formItemNode.querySelector(`[id="${id}"]`) as HTMLElement;
    if (control && control.focus) {
      control.focus();
    }
  };

  onHelpAnimEnd = (_key: string, helpShow: boolean) => {
    this.helpShow = helpShow;
    if (!helpShow) {
      this.setState({});
    }
  };

  isRequired() {
    const { required } = this.props;
    if (required !== undefined) {
      return required;
    }
    if (this.getOnlyControl()) {
      const meta = this.getMeta() || {};
      const validate = meta.validate || [];

      return validate
        .filter((item: any) => !!item.rules)
        .some((item: any) => item.rules.some((rule: any) => rule.required));
    }
    return false;
  }

  renderHelp(prefixCls: string) {
    const help = this.getHelpMessage();
    const children = help ? (
      <div className={`${prefixCls}-explain`} key="help">
        {help}
      </div>
    ) : null;
    if (children) {
      this.helpShow = !!children;
    }
    return (
      <Animate
        transitionName="show-help"
        component=""
        transitionAppear
        key="help"
        onEnd={this.onHelpAnimEnd}
      >
        {children}
      </Animate>
    );
  }

  renderExtra(prefixCls: string) {
    const { extra } = this.props;
    return extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null;
  }

  renderValidateWrapper(
    prefixCls: string,
    c1: React.ReactNode,
    c2: React.ReactNode,
    c3: React.ReactNode,
  ) {
    const { props } = this;
    const onlyControl = this.getOnlyControl;
    const validateStatus =
      props.validateStatus === undefined && onlyControl
        ? this.getValidateStatus()
        : props.validateStatus;

    let classes = `${prefixCls}-item-control`;
    if (validateStatus) {
      classes = classNames(`${prefixCls}-item-control`, {
        'has-feedback': props.hasFeedback || validateStatus === 'validating',
        'has-success': validateStatus === 'success',
        'has-warning': validateStatus === 'warning',
        'has-error': validateStatus === 'error',
        'is-validating': validateStatus === 'validating',
      });
    }

    let iconType: React.ReactNode = null;
    switch (validateStatus) {
      case 'success':
        iconType = <CheckCircleFilled />;
        break;
      case 'warning':
        iconType = <ExclamationCircleFilled />;
        break;
      case 'error':
        iconType = <CloseCircleFilled />;
        break;
      case 'validating':
        iconType = <LoadingOutlined />;
        break;
      default:
        break;
    }

    const icon =
      props.hasFeedback && iconType ? (
        <span className={`${prefixCls}-item-children-icon`}>
          {iconType}
        </span>
      ) : null;

    return (
      <div className={classes}>
        <span className={`${prefixCls}-item-children`}>
          {c1}
          {icon}
        </span>
        {c2}
        {c3}
      </div>
    );
  }

  renderWrapper(prefixCls: string, children: React.ReactNode) {
    return (
      <FormContext.Consumer key="wrapper">
        {({ wrapperCol: contextWrapperCol, vertical }: FormContextProps) => {
          const { wrapperCol } = this.props;
          const mergedWrapperCol: ColProps =
            ('wrapperCol' in this.props ? wrapperCol : contextWrapperCol) || {};

          const className = classNames(
            `${prefixCls}-item-control-wrapper`,
            mergedWrapperCol.className,
          );

          // No pass FormContext since it's useless
          return (
            <FormContext.Provider value={{ vertical }}>
              <Col {...mergedWrapperCol} className={className}>
                {children}
              </Col>
            </FormContext.Provider>
          );
        }}
      </FormContext.Consumer>
    );
  }

  renderLabel(prefixCls: string) {
    return (
      <FormContext.Consumer key="label">
        {({
          vertical,
          labelAlign: contextLabelAlign,
          labelCol: contextLabelCol,
          colon: contextColon,
        }: FormContextProps) => {
          const {
            label,
            labelCol,
            labelAlign,
            colon,
            id,
            htmlFor,
          } = this.props;
          const required = this.isRequired();

          const mergedLabelCol: ColProps =
            ('labelCol' in this.props ? labelCol : contextLabelCol) || {};

          const mergedLabelAlign: FormLabelAlign | undefined =
            'labelAlign' in this.props ? labelAlign : contextLabelAlign;

          const labelClsBasic = `${prefixCls}-item-label`;
          const labelColClassName = classNames(
            labelClsBasic,
            mergedLabelAlign === 'left' && `${labelClsBasic}-left`,
            mergedLabelCol.className,
          );

          let labelChildren = label;
          // Keep label is original where there should have no colon
          const computedColon =
            colon === true || (contextColon !== false && colon !== false);
          const haveColon = computedColon && !vertical;
          // Remove duplicated user input colon
          if (
            haveColon &&
            typeof label === 'string' &&
            (label as string).trim() !== ''
          ) {
            labelChildren = (label as string).replace(/[：:]\s*$/, '');
          }

          const labelClassName = classNames({
            [`${prefixCls}-item-required`]: required,
            [`${prefixCls}-item-no-colon`]: !computedColon,
          });

          return label ? (
            <Col {...mergedLabelCol} className={labelColClassName}>
              <label
                htmlFor={htmlFor || id || this.getId()}
                className={labelClassName}
                title={typeof label === 'string' ? label : ''}
                onClick={this.onLabelClick}
              >
                {labelChildren}
              </label>
            </Col>
          ) : null;
        }}
      </FormContext.Consumer>
    );
  }

  renderChildren(prefixCls: string) {
    const { children } = this.props;
    return [
      this.renderLabel(prefixCls),
      this.renderWrapper(
        prefixCls,
        this.renderValidateWrapper(
          prefixCls,
          children,
          this.renderHelp(prefixCls),
          this.renderExtra(prefixCls),
        ),
      ),
    ];
  }

  renderFormItem = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      style,
      className,
      ...restProps
    } = this.props;
    const prefixCls = getPrefixCls('legacy-form', customizePrefixCls);
    const children = this.renderChildren(prefixCls);
    const itemClassName = {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-with-help`]: this.helpShow,
      [`${className}`]: !!className,
    };

    return (
      <Row
        className={classNames(itemClassName)}
        style={style}
        {...omit(restProps, [
          'id', // It is deprecated because `htmlFor` is its replacement.
          'htmlFor',
          'label',
          'labelAlign',
          'labelCol',
          'wrapperCol',
          'help',
          'extra',
          'validateStatus',
          'hasFeedback',
          'required',
          'colon',
        ])}
        key="row"
      >
        {children}
      </Row>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderFormItem}</ConfigConsumer>;
  }
}
