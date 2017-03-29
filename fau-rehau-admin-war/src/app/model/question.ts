import { Option } from './option';
import { ShowOn } from './showon';

export class Question {
    options: Array<Option> = new Array<Option>();
    description: string;
    label: string;
    uniqueId: string;
    shownOn: Array<ShowOn> = new Array<ShowOn>();
}