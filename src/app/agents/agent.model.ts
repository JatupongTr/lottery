import { Lotto } from "../shared/lotto.model";


export interface Agent {
  id: string;
  code: string;
  name: string;
  imagePath: string;
  order: Lotto[]
}
