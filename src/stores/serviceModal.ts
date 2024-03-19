import { reactive } from 'vue';

const serviceModalInfo = {
  status: 'Hide' as 'Show' | 'Hide',
  serviceID: '' as string,
  serviceCategory: '' as ServiceCategory
}

export default serviceModalInfo;