import React from 'react';
import { connect } from "react-redux";
import { Panel, Cell, Group, Avatar, PanelHeader, CellButton } from '@vkontakte/vkui';

import Icon16Back from '@vkontakte/icons/dist/24/back';
import Icon16Like from '@vkontakte/icons/dist/16/like';

const Home = ({ id, user, go, transactions, transactionSelect }) => (
	<Panel id={id}>
		<PanelHeader>ProDialog</PanelHeader>
		{user &&
		<Group
			title="Мой профиль"
		>
			<Cell
				expandable
				before={user.photo_200 ? <Avatar src={user.photo_200}/> : null}
				description={user.carma ? "Карма: " + user.carma : null}
				onClick={() => go("profile")}
			>
				{user.first_name + ' ' +user.last_name}
			</Cell>
			<CellButton
				align="center"
				onClick={() => go("top")}
			>
				Топ-15 по карме
			</CellButton>
		</Group>}
		<Group
			title="История операций"
		>
			{transactions && transactions.map((op, key) => {
				if (op.subuser === "1") {
					return (
						<Cell
							key={key}
							before={
								<Avatar style={{ background: "var(--destructive)" }} size={28}>
									<Icon16Like fill="var(--white)" />
								</Avatar>
							}
							description={"Сумма: " + op.carma}
						>
							Перевод от ProDialog
						</Cell>
					);
				}
				return (
					<Cell
						key={key}
						expandable
						before={
							<Avatar style={{ background: op.send ? "var(--accent)" : "var(--button_commerce_background)" }} size={28}>
								<div style={{ transform: op.send ? "rotate(45deg)" : "rotate(225deg)" }}>
									<Icon16Back
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
						Перевод {op.send ? "для" : "от"} {op.first_name}
					</Cell>
				);
			})}
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
