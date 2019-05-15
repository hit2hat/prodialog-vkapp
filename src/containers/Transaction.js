import React from "react";
import { connect } from "react-redux";
import VKConnect from "@vkontakte/vkui-connect-promise";
import { Panel, Group, Avatar, PanelHeader, CellButton } from "@vkontakte/vkui";
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

const Transaction = ({ id, back, transaction }) => {
    let date = new Date();
    date.setTime((transaction.time || 0) * 1000);
    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={back} />}
            >
                Транзакция
            </PanelHeader>
            <Group>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: 25
                }}>
                    <div style={{ textAlign: "center" }}>
                        <Avatar
                            src={transaction.avatar}
                            size={120}
                        />
                    </div>
                    <h3 style={{marginBottom: 0}}>Карма {transaction.send ? "для" : "от"} {transaction.first_name}</h3>
                </div>
                <CellButton
                    align="center"
                    style={{borderTop: "5px solid var(--background_page)"}}
                    onClick={() => VKConnect.send("VKWebAppShare", {"link": "https://vk.com/app6982755#transactionId=" + transaction.id})}
                >
                    Поделиться
                </CellButton>
            </Group>
            <Group
                title="Время"
            >
                <div style={{marginLeft: 12, paddingBottom: 15}}>
                    {date.toUTCString()}
                </div>
            </Group>
            <Group
                title="Сумма"
            >
                <div style={{marginLeft: 12, paddingBottom: 15}}>
                    <span style={{color: transaction.type === "+" ? "#4bb34b" : "#e64646"}}>{transaction.carma}</span>
                </div>
            </Group>
            <Group
                title="Сообщение"
            >
                <div style={{marginLeft: 12, paddingBottom: 15}}>{transaction.reason}</div>
            </Group>
        </Panel>
    );
};

const mapProps = (state) => ({
    transaction: state.transactions.selected
});

const mapDispatch = ({ navigator: { goBack } }) => ({
    back: goBack
});

export default connect(mapProps, mapDispatch)(Transaction);