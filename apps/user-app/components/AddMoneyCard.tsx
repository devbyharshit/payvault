"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import db from "@repo/db/client";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransaction";

const SUPPORTED_BANKS = [
	{
		name: "HDFC Bank",
		redirectUrl: "https://netbanking.hdfcbank.com",
	},
	{
		name: "Axis Bank",
		redirectUrl: "https://www.axisbank.com/",
	},
];

export const AddMoney = () => {
	const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
	const [amount, setAmount] = useState(0);
	const [providerBank, setProviderBank] = useState(SUPPORTED_BANKS[0]?.name || "");

	const handleBankRedirect = async () => {
		try {
			const response = await createOnRampTransaction(providerBank, amount);
			window.location.href = redirectUrl || "";
			console.log("----> response", response);
		} catch (error) {
			console.error("Error creating transaction:", error);
		}
	};

	return (
		<Card title="Add Money">
			<div className="w-full">
				<TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => setAmount(Number(value))} />
				<div className="py-4 text-left">Bank</div>
				<Select
					onSelect={(value) => {
						setRedirectUrl(SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || "");
						setProviderBank(value);
					}}
					options={SUPPORTED_BANKS.map((x) => ({
						key: x.name,
						value: x.name,
					}))}
				/>
				<div className="flex justify-center pt-4">
					<Button onClick={handleBankRedirect}>Add Money</Button>
				</div>
			</div>
		</Card>
	);
};
