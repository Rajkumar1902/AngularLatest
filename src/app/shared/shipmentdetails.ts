import { ShipmentContainerInfo} from './shipmentcontainerinfo';

export abstract class ShipmentDetails {
  shipmentDetailsId: string;
  itemNumber: number;
  itemPackageLevelIDCode: string;
  itemGroupCode: string;
  itemType: string;
  originCountryCode: string;
  quantity: number;
  numberOfUnits: number;
  length: number;
  width: number;
  height: number;
  shipmentContainerInfo: ShipmentContainerInfo;
}
