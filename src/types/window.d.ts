interface SuiWallet {
    requestAccounts(): Promise<string[]>;
    // Add other wallet methods as needed
}

declare global {
    interface Window {
        suiWallet?: SuiWallet;
    }
}
