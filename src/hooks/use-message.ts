import { IntlShape, PrimitiveType, useIntl } from 'react-intl';

export interface IntlMessage {
  intl: IntlShape;
  formatMessage(id: string, values?: Record<string, PrimitiveType>): string;
  formatNumber(value: number | bigint): string;
}

export function useMessage(): IntlMessage {
  const intl = useIntl();
  return {
    intl,
    formatMessage: (id, values) => intl.formatMessage({ id }, values),
    formatNumber: (value: number | bigint) => intl.formatNumber(value),
  };
}
