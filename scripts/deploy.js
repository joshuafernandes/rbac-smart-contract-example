async function main() {
  const [deployer] = await ethers.getSigners();

  const admin = "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73";
  const user = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
  const nonregistered = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";


  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy(admin, user);

  console.log("Counter deployed to:", counter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
