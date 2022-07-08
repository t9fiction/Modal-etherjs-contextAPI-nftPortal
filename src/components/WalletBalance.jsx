import {GlobalStore} from '../context/GlobalState'
import Button from '@mui/material/Button';

function WalletBalance() {
    const { accBalance, getBalance, currentAccount } = GlobalStore();
    return (
        <div>
            <Button onClick={() => getBalance()} >Show My Balance</Button>
            {accBalance && currentAccount && (<> {currentAccount} : {accBalance}</>)}
        </div>
    );
};

export default WalletBalance;