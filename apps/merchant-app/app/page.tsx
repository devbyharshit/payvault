"use client";

import { useBalance } from "@repo/store/balance";

export default function () {
	const balance = useBalance();
	return <div>hi there, hello this is a test branch {balance}</div>;
}
