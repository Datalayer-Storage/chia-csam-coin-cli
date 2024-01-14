
# Chia CSAM Coin CLI

## Description
Fork of Server Coin to add an additional namespace for a federated database of known storeids that contain CSAM content. For the purposes of blocking them from DIG nodes. When a DIG node detects content they want to report as CSAM content. They will hash the DataLayer StoreID and create a coin that reports it as possible CSAM content. Each DIG node will then be responsible for consuming this federated database and double checking the stores before choosing to serve them or not.

By hashing the store id in the federated database of storeids that may contain csam content, we provide a tool the DIG nodes can use to check against, while avoiding publishing the actual store ids. This way we are not inadvertantly creating a lookup service for such content.

## Installation

```bash
npm install chia-csam-coin-cli -g
```

## Usage
To use this CLI, run it as follows:

```bash
csam_coin [command] [options]
```

### Commands:
- `add`: Create a CSAM Coin on the blockchain for a specified data store.
- `delete`: Delete a CSAM Coin on the blockchain for a specified data store.
- `get_csam_coins`: Get all CSAM Coins on the blockchain for a specified data store.

## Command Examples
- Creating a CSAM Coin:
  ```bash
  csam_coin add --storeId [Store ID] --amount [Amount] --url [URL] [other options]
  ```

- Deleting a CSAM Coin:
  ```bash
  csam_coin delete --coinId [Coin ID] [other options]
  ```

- Getting CSAM Coins:
  ```bash
  csam_coin get_csam_coins --storeId [Store ID] [other options]
  ```

## Options
- `--storeId`: Store ID for the data store.
- `--amount`: Amount of mojos to lock up in the Server Coin.
- `--url`: URL of the server.
- `--feeOverride`: Fee override.
- `--fullNodeHost`: Host for your Full Node.
- `--fullNodePort`: Port for your Full Node.
- `--certificateFolderPath`: Path to the certificate SSL folder.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
