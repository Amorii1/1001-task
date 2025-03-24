import app from "./app";
import { envData } from "./utils/envData";

const PORT = envData.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
