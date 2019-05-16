import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Panel, Cell, Group, Avatar, PanelHeader, List, Spinner, PullToRefresh, HeaderButton, Tooltip } from "@vkontakte/vkui";
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';

import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon16Gift from "@vkontakte/icons/dist/16/gift";
import Icon24Discussions from '@vkontakte/icons/dist/24/discussions';
import Icon24Poll from "@vkontakte/icons/dist/24/poll";
import Icon24Info from '@vkontakte/icons/dist/24/info';

import { fireEvent } from "../utils";

const Home = ({ id, user, go, transactions, cloud, transactionSelect, resetTransactions, loadUser, topPlace, openProfile, cloudUpdate }) => {
	const [loading, setLoading] = useState(false);
	const [discussionLinkTooltip, setDiscussionLinkTooltip] = useState(false);

	const refresh = async () => {
		setLoading(true);
		resetTransactions();
		await loadUser();
		setLoading(false);
	};

	useEffect(() => {
		setDiscussionLinkTooltip(cloud.loaded ? !cloud.discussion_tooltip : false);
	}, [cloud.discussion_tooltip, cloud.loaded]);

	return (
		<Panel id={id}>
			<PanelHeader
				left={
					<Tooltip
						text="Нажмите, чтобы открыть нашу беседу"
						isShown={discussionLinkTooltip}
						onClose={() => {
							setDiscussionLinkTooltip(false);
							cloudUpdate({ param: "discussion_tooltip", value: true});
						}}
						offsetX={5}
						offsetY={5}
					>
						<HeaderButton onClick={() => fireEvent("https://vk.me/join/AJQ1dxiivA8PKJX4/88YYsRJ")}>
							<Icon24Discussions/>
						</HeaderButton>
					</Tooltip>
				}
			>
				ProDialog
			</PanelHeader>
			<PullToRefresh
				onRefresh={refresh}
				isFetching={loading}
			>
				{user &&
				<Group title="Мой профиль">
					<Cell
						expandable
						before={user.photo_200 ? <Avatar src={user.photo_200}/> : null}
						description={user.carma ? "Карма: " + user.carma : "Карма: ..."}
						onClick={() => openProfile(user.id)}
					>
						{user.first_name + " " +user.last_name}
					</Cell>
				</Group>}

				<Group title="Меню">
					<List>
						<Cell
							expandable
							before={<Icon24Poll/>}
							indicator={topPlace !== 0 ? <Counter type="primary"><span style={{padding: '0 5px'}}>Ваше место: {topPlace}</span></Counter> : null}
							onClick={() => go("top")}
						>
							Рейтинг
						</Cell>
						<Cell
							expandable
							before={<Icon24Info/>}
							onClick={() => go("about")}
						>
							О сервисе
						</Cell>
					</List>
				</Group>

				<Group
					title="История операций"
				>
					{transactions.length > 0 ? transactions.map((op, key) => {
						if (op.subuser === "1") {
							return (
								<Cell
									key={key}
									before={
										<Avatar style={{ background: "black" }} size={28}>
											<Icon16Gift fill="var(--white)" />
										</Avatar>
									}
									description={"Сумма: " + op.carma}
								>
									Подарок от ProDialog
								</Cell>
							);
						}
						return (
							<Cell
								key={key}
								expandable
								before={
									<Avatar style={{ background: op.send ? "#528bcc" : op.type === "+" ? "#4bb34b" : "#e64646" }} size={28}>
										<div style={{ transform: op.send ? "rotate(45deg)" : "rotate(225deg)" }}>
											<Icon24Back
												fill="var(--white)"
											/>
										</div>
									</Avatar>
								}
								description={"Комментарий: " + op.reason}
								onClick={() => {
									transactionSelect(op);
									go("transaction");
								}}
							>
								Карма {op.send ? "для" : "от"} {op.first_name}
							</Cell>
						);
					}) : <Spinner size="medium" style={{ marginTop: 20, paddingBottom: 20 }} />}
				</Group>
			</PullToRefresh>
		</Panel>
	);
};

const mapProps = (state) => ({
	user: state.user.vk,
	transactions: state.transactions.list,
	topPlace: state.top.findIndex(x => x.id === state.user.vk.id) + 1,
	cloud: state.cloud
});

const mapDispatch = ({ navigator: { goForward }, transactions: { select, reset }, user: { load, openProfile }, cloud: { changeParam } }) => ({
	go: goForward,
	transactionSelect: select,
	resetTransactions: reset,
	loadUser: load,
	openProfile,
	cloudUpdate: changeParam
});

export default connect(mapProps, mapDispatch)(Home);
