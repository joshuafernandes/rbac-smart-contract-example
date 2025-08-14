require("dotenv").config();
const hre = require("hardhat");
const { ethers } = hre;

async function main() {

  // Setup signers from private keys
  //0xfe3b557e8fb62b89f4916b721be55ceb828dbd73
  const admin = new ethers.Wallet("0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63", ethers.provider);
  //0x627306090abaB3A6e1400e9345bC60c78a8BEf57
  const user = new ethers.Wallet("0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3", ethers.provider);
  //0xf17f52151EbEF6C7334FAD080c5704D77216b732
  const nonReg = new ethers.Wallet("0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f", ethers.provider);

  console.log("Deploying with admin:", admin.address);
  // Deploy the contract with admin
  const Counter = await ethers.getContractFactory("Counter", admin);
  const counter = await Counter.deploy(admin.address, user.address);
  await counter.waitForDeployment();

  console.log("### Contract deployed at:", counter.getAddress());

  // Interact using Admin
  console.log("\n### Interact using Admin... ");
  console.log("1. Admin calls set(100)");
  let tx = await counter.connect(admin).set(100);
  await tx.wait();
  console.log("✅️");
  console.log("2. Admin calls decrement()");
  tx = await counter.connect(admin).decrement();
  await tx.wait();
  console.log("✅️");
  let value = await counter.get();
  console.log("3. Check the value returned after admin decrement - expect 99 :", value.toString()); // Expect 99
  console.log("✅️");

  // Interact using User
  console.log("\n### Interact using User... ");
  console.log("1. User calls increment()");
  tx = await counter.connect(user).increment();
  await tx.wait();
  console.log("✅️");
  value = await counter.get();
  console.log("2. Check the value returned after admin decrement - expect 99 :", value.toString()); // Expect 100
  console.log("✅️");

  // Interact using Non-registered
  console.log("\n### Interact using Non-registered... ");
  console.log("1. Non-registered tries increment()");
  try {
    await counter.connect(nonReg).increment();
  } catch (err) {
    console.log("🚫 Access denied as expected:", err.message);
  }
  value = await counter.connect(nonReg).get();
  console.log("2. Non-registered calls get() :", value.toString()); // Expect 100
  console.log("✅️");
  
  // Check roles
  console.log("\n### Role checks:");
  console.log("isAdmin(admin)?", await counter.isAdmin(admin.address));
  console.log("isUser(user)?", await counter.isUser(user.address));
  console.log("isAdmin(user)?", await counter.isAdmin(user.address));
  console.log("isUser(nonReg)?", await counter.isUser(nonReg.address));
  console.log("isAdmin(nonReg)?", await counter.isAdmin(nonReg.address));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});