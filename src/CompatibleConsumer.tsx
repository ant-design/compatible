import { ConfigProvider } from 'antd';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';

export { ConfigConsumerProps };

const MergedConfigConsumer =
  ConfigProvider?.ConfigContext?.Consumer || ConfigConsumer;

export default MergedConfigConsumer;
