/**
 * @FileName: icon
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/16 0:49
 */
import Icon from '@ant-design/icons';
import {ReactComponent as Submit} from "./submit.svg";
import {ReactComponent as SubmitOutline} from "./submit-o.svg";
import {ReactComponent as Rank} from "./rank.svg"
export const SubmitIconOutline = () => <Icon component={SubmitOutline}/>
export const SubmitIcon = () => <Icon component={Submit}/>
export const RankIcon = () => <Icon component={Rank}/>
