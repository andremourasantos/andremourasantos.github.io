import { reactive } from 'vue';

const serviceModalInfo = {
  status: 'Hide' as 'Show' | 'Hide',
  serviceID: '' as string,
  serviceCategory: '' as 'Marketing' | 'Web',
  serviceImage: '' as string,
  serviceName: '' as string,
  serviceButtonDescription: '' as string
}

export default serviceModalInfo;