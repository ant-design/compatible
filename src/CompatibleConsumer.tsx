import { ConfigProvider } from 'antd';
import type { ConfigConsumerProps } from 'antd/es/config-provider';

export { ConfigConsumerProps };

const MergedConfigConsumer = ConfigProvider.ConfigContext.Consumer;

export default MergedConfigConsumer;
