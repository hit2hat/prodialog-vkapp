import React from "react";
import { connect } from "react-redux";
import { Panel, PanelHeader, Div, Group, List, Cell, Avatar } from "@vkontakte/vkui";
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

import Icon24Bug from '@vkontakte/icons/dist/24/bug';
import Icon24Help from '@vkontakte/icons/dist/24/help';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';

import { fireEvent } from "../utils";

const About = ({ id, back }) => {
    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={back} />}
            >
                О сервисе
            </PanelHeader>
            <Group style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "25px 100px",
                textAlign: "center"
            }}>
                <Div>
                    <img src={require("../assets/logo.svg")} alt="" style={{
                        width: "100%",
                        boxShadow: "0 0 25px #C165DD",
                        borderRadius: 35,
                        background: "#C165DD"
                    }}/>
                    <h3 style={{ margin: 0, padding: 0, paddingTop: 25 }}>ProDialog App</h3>
                    <h4 style={{ margin: 0, padding: 0, paddingTop: 5, color: 'rgba(0, 0, 0, .5)'}}>
                        Версия: {process.env.REACT_APP_VERSION ? process.env.REACT_APP_VERSION.slice(0, 7) : "untagged"}
                    </h4>
                </Div>
            </Group>
            <Group>
                <Div>
                    Классное описание, которое мы еще не придумали
                </Div>
            </Group>
            <Group title="Разработчики">
                <List>
                    <Cell
                        onClick={() => fireEvent("https://vk.com/id279404198")}
                        description="Идея. Бек на нём"
                        before={<Avatar src="https://sun1-86.userapi.com/c849416/v849416103/f029a/hWjYns4DKcw.jpg?ava=1" />}
                    >
                        Дмитрий Гаруськин
                    </Cell>
                    <Cell
                        onClick={() => fireEvent("https://vk.com/id182625786")}
                        description="Пасан фронт кодит"
                        before={<Avatar src="https://sun1-23.userapi.com/c850632/v850632751/1099c4/qw3BsBsm7OU.jpg?ava=1" />}
                    >
                        Степан Новожилов
                    </Cell>
					   <Cell
                        onClick={() => fireEvent("https://vk.com/id113677977")}
                        description="Какой-то левый чувак"
                        before={<Avatar src="https://vk.com/images/camera_200.png?ava=1" />}
                    >
                        Сергей Бондаренко
                    </Cell>
                </List>
            </Group>
            <Group title="Полезные ссылки">
                <List>
                    <Cell
                        expandable
                        onClick={() => fireEvent("https://vk.com/prodialog")}
                        before={<Icon24Globe/>}
                    >
                      Официальная группа
                    </Cell>
                    <Cell
                        expandable
                        onClick={() => fireEvent("https://vk.me/prodialog")}
                        before={<Icon24Help/>}
                    >
                       Предложить идею
                    </Cell>
                    <Cell
                        expandable
                        onClick={() => fireEvent("https://vk.com/id182625786")}
                        before={<Icon24Bug fill="#4bb34b" />}
                    >
                        <span style={{ color: "#4bb34b" }}>Сообщить о баге</span>
                    </Cell>
                </List>
            </Group>
        </Panel>
    );
};

const mapProps = () => ({});
const mapDispatch = ({ navigator: { goBack } }) => ({
    back: goBack
});

export default connect(mapProps, mapDispatch)(About);
