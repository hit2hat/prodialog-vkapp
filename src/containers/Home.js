import React from "react";
import { connect } from "react-redux";
import { Panel, Cell, Group, Avatar, PanelHeader, List, Spinner } from "@vkontakte/vkui";

import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon16Gift from "@vkontakte/icons/dist/16/gift";

import Icon24Poll from "@vkontakte/icons/dist/24/poll";

const Home = ({ id, user, go, transactions, transactionSelect }) => (
	<Panel id={id}>
		<PanelHeader>ProDialog</PanelHeader>
		{user &&
		<Group title="Мой профиль">
			<Cell
				expandable
				before={user.photo_200 ? <Avatar src={user.photo_200}/> : null}
				description={user.carma ? "Карма: " + user.carma : "Карма: ..."}
				onClick={() => go("profile")}
			>
				{user.first_name + " " +user.last_name}
			</Cell>
		</Group>}

		<Group title="Меню">
			<List>
				<Cell
					expandable
					before={<Icon24Poll/>}
					onClick={() => go("top")}
				>
					Рейтинг
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
	</Panel>
);

const mapProps = (state) => ({
	user: state.user,
	transactions: state.transactions.list
});

const mapDispatch = ({ navigator: { goForward }, transactions: { select } }) => ({
	go: goForward,
	transactionSelect: select
});

export default connect(mapProps, mapDispatch)(Home);
