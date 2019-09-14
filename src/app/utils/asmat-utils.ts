import {Asmat} from '../model/asmat';

export function formatAvailability(asmat: Asmat): string {
  if (asmat.availabilityCommunicated) {
    const babyAvailability = asmat.babyAvailability;
    const scholarAvailability = asmat.scholarAvailability;

    if (babyAvailability === 0 && scholarAvailability === 0) {
      return 'Aucune';
    } else {
      let result = '';
      if (babyAvailability > 0) {
        result += `${babyAvailability} bébé${babyAvailability > 1 ? 's' : ''}`;
        if (scholarAvailability > 0) {
          result += ' et ';
        }
      }
      if (scholarAvailability > 0) {
        result += `${scholarAvailability} périscolaire${scholarAvailability > 1 ? 's' : ''}`;
      }
      return result;
    }
  } else {
    return 'Non communiquée';
  }
}