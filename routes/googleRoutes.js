import axios from 'axios';
import express from 'express';
const router = express.Router();

router.get('/', async(req, res) => {
    const resData = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.address}&key=AIzaSyC9nSGumZ7_6Xs0pd6HBiU_paZT7mmH5UI`);
    return res.status(200).json({ data:resData.data });
})


export default router