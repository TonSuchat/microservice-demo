import bcrypt from "bcryptjs";

const passwordCompareSync = (password, passwordHash) =>
  bcrypt.compareSync(password, passwordHash);

export default passwordCompareSync;
