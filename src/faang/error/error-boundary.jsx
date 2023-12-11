/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';

import { getErrorSafe } from './get-error-safe';

import { getReactElementDisplayName } from './get-react-element-display-name';

import { ErrorSerializer } from './error-serializer';

import { ErrorPubSub } from './error-pub-sub';

function getReactDisplayName(children) {
  const _children =
    React.Children.count(children) > 1
      ? React.Children.toArray(children)[0]
      : children;
  return getReactElementDisplayName(_children);
}

export class ErrorBoundary extends PureComponent {
  static defaultProps = {
    forceResetErrorCount: 0,
  };

  static getDerivedStateFromError = function (error) {
    return {
      error: getErrorSafe(error),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      // eslint-disable-next-line react/prop-types
      moduleName: getReactDisplayName(this.props.children),
    };

    this.suppressReactDefaultErrorLogging = true;
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.error &&
      this.props.forceResetErrorCount != null &&
      this.props.forceResetErrorCount !== prevProps.forceResetErrorCount
    ) {
      this.setState({
        error: null,
      });
      return;
    }
  }

  componentDidCatch(e, errorInfo) {
    const { componentStack } = errorInfo;
    let {
      augmentError,
      context = {},
      description = 'base',
      onError,
    } = this.props;

    if (context.messageFormat == null) {
      context.messageFormat = 'caught error in module %s (%s)';
      context.messageParams = [this.state.moduleName, description];
    }

    const { error, moduleName } = this.state;

    if (error != null) {
      ErrorSerializer.aggregateError(error, {
        componentStack,
        loggingSource: 'ERROR_BOUNDARY',
      });

      ErrorSerializer.aggregateError(error, context);

      if (typeof augmentError === 'function') {
        augmentError(error);
      }

      ErrorPubSub.reportError(error);

      if (typeof onError === 'function') {
        onError(error, moduleName);
      }
    }
  }

  render() {
    const { error, moduleName } = this.state;
    if (error) {
      const { fallback } = this.props;
      return fallback != null ? fallback(error, moduleName) : null;
    }
    return this.props.children != null ? this.props.children : null;
  }
}
