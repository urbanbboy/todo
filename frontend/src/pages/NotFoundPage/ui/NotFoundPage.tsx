import { RouteNames } from "@/app/providers/RouterProvider"
import { Button, Flex, Typography } from "antd"

const NotFoundPage = () => {
    const { Title } = Typography

    return (
        <Flex
            align="center"
            justify="center"
            vertical
            style={{
                height: '100dvh'
            }}
        >
            <Title level={1}>404</Title>
            <Title level={4}> Страница не найдена </Title>
            <Button variant="filled" href={RouteNames.TODO_PAGE}>Вернуться на главную</Button>
        </Flex>
    )
}

export default NotFoundPage