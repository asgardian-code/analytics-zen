import { http } from './http';

const port = 8080;

http.listen(port, () => {
    console.clear()
    console.log(`[ANALYTICS] - running at port ${port}`);
});