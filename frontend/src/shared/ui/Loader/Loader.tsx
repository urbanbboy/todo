import { Flex, Spin } from 'antd';

export const Loader = () => {
    return (
        <Flex justify={'center'} align={'center'} style={{ margin: '30px' }}>
            <Spin />
        </Flex>
    )
}
