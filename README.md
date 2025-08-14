
# Simple example of using RBAC for a smart contract

We use the counter.sol example and extend with `@openzeppelin/contracts`

### Roles

Keys are public already, calm down ;) Nothing to see...

|  Role | AccountAddress  |  Calls |  Outcome |
|---|---|---|---|
| Admin | 0xfe3b557e8fb62b89f4916b721be55ceb828dbd73  | set(), decrement()  | ✅  |
| User| 0x627306090abaB3A6e1400e9345bC60c78a8BEf57  |  increment() |  ✅ |
| Non-Registered | 0xf17f52151EbEF6C7334FAD080c5704D77216b732   | increment()  | ❌ Reverted with access denied  |
| Anyone |    | get()  | ✅  |

### Setup and test

Im using the Besu quickstart [network](./network/).

Start it up with 
```
cd network
./run.sh

# to stop it 
./remove.sh
```

Update your hardhat [settings](hardhat.config.js) as needed 

Run with 
```
npm init
npm run compile
npm run test
```

Expected output
```
> rbac-smart-contract-example@1.0.0 test
> hardhat run scripts/deploy-and-test.js --network quickstart

Deploying with admin: 0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73
### Contract deployed at: Promise { <pending> }

### Interact using Admin... 
1. Admin calls set(100)
✅️
2. Admin calls decrement()
✅️
3. Check the value returned after admin decrement - expect 99 : 99
✅️

### Interact using User... 
1. User calls increment()
✅️
2. Check the value returned after user increment - expect 100
✅️

### Interact using Non-registered... 
1. Non-registered tries increment()
🚫 Access denied as expected: Execution reverted (Access denied: must have USER_ROLE or be admin)
2. Non-registered calls get() : 100
✅️

### Role checks:
isAdmin(admin)? true
isUser(user)? true
isAdmin(user)? false
isUser(nonReg)? false
isAdmin(nonReg)? false
```
