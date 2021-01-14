import { ConfigProvider } from 'antd';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';

export { ConfigConsumerProps };

const MergedConfigConsumer =
  (ConfigProvider as any)?.ConfigContext?.Consumer || ConfigConsumer;

export default MergedConfigConsumer;
