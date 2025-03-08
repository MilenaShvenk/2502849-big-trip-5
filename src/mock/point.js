import {getRandomArrayElement} from '../utils.js';


const mockPoints = [
  {
    'id': '4be4f79e-58a3-48a9-9be6-6b26b120b1b9',
    'base_price': 7906,
    'date_from': '2025-04-23T20:41:13.819Z',
    'date_to': '2025-04-24T16:52:13.819Z',
    'destination': '48169512-42de-4055-9795-1c558e1ce105',
    'is_favorite': true,
    'offers': [],
    'type': 'train'
  },
  {
    'id': '5bd0cc92-77ad-4242-9784-e35e7b162acc',
    'base_price': 9136,
    'date_from': '2025-04-26T02:31:13.819Z',
    'date_to': '2025-04-27T06:19:13.819Z',
    'destination': 'f0e7a74a-f073-4bb7-b287-45cf5eddba7b',
    'is_favorite': false,
    'offers': [
      '24f8abbc-9789-4e1c-a044-7326b58a5fdc',
      'ca4b6bdf-1760-4cf4-8a62-45833daac5b8',
      '1422353c-bb8c-439c-9778-187f352f7d3b'
    ],
    'type': 'taxi'
  },
  {
    'id': '2619942e-cc37-44c6-9d41-c5c4bbf21911',
    'base_price': 8971,
    'date_from': '2025-04-28T05:26:13.819Z',
    'date_to': '2025-04-29T10:15:13.819Z',
    'destination': 'afd4eadc-4c13-43d1-a7f9-6484f5df0063',
    'is_favorite': true,
    'offers': [
      '5f72ff8d-7797-4f10-8bdc-c57196d6b47b'
    ],
    'type': 'train'
  },
  {
    'id': '239f4136-7719-425e-b4b7-f97373019967',
    'base_price': 7747,
    'date_from': '2025-05-01T08:21:13.819Z',
    'date_to': '2025-05-01T21:05:13.819Z',
    'destination': 'af5330f9-30e7-47de-817a-6b03f15e0981',
    'is_favorite': false,
    'offers': [
      '655df726-0f91-4901-9a29-7fb112a4cb9e',
      '8b59f7bc-65bc-443f-ad13-79257b8f13f7'
    ],
    'type': 'restaurant'
  },
  {
    'id': '170fa809-e5cd-42e1-9380-3d17ef793c5d',
    'base_price': 2056,
    'date_from': '2025-05-03T20:17:13.819Z',
    'date_to': '2025-05-04T16:15:13.819Z',
    'destination': '9023acec-5459-47ce-8c0e-27193e8f574d',
    'is_favorite': false,
    'offers': [
      '1971d30d-4b6f-4a2d-840d-63702714850e'
    ],
    'type': 'ship'
  },
  {
    'id': 'be138bc9-eb46-481a-80cd-6e777dfe894e',
    'base_price': 7712,
    'date_from': '2025-05-06T15:12:13.819Z',
    'date_to': '2025-05-06T21:38:13.819Z',
    'destination': 'f14b9aa5-eb21-49b5-8354-db6b1dc5538e',
    'is_favorite': false,
    'offers': [
      '8b59f7bc-65bc-443f-ad13-79257b8f13f7'
    ],
    'type': 'restaurant'
  },
  {
    'id': 'e7941c56-e956-496e-afd0-b88a4a6bfb3d',
    'base_price': 6021,
    'date_from': '2025-05-07T17:40:13.819Z',
    'date_to': '2025-05-08T20:37:13.819Z',
    'destination': '47006bd6-170a-41a7-a545-7d5d8787ee4c',
    'is_favorite': false,
    'offers': [
      'd7b22851-7bb4-4a08-9b96-ee2b3fcb6013',
      '5106ed7f-bfed-46b5-b742-4f4cbfdbed17',
      '24f8abbc-9789-4e1c-a044-7326b58a5fdc',
      'ca4b6bdf-1760-4cf4-8a62-45833daac5b8',
      '1422353c-bb8c-439c-9778-187f352f7d3b'
    ],
    'type': 'taxi'
  },
  {
    'id': 'd2fd0a3b-eb8f-44db-bb5e-ffc8bfa8ea5a',
    'base_price': 1517,
    'date_from': '2025-05-09T09:27:13.819Z',
    'date_to': '2025-05-11T09:03:13.819Z',
    'destination': 'afd4eadc-4c13-43d1-a7f9-6484f5df0063',
    'is_favorite': false,
    'offers': [],
    'type': 'bus'
  },
  {
    'id': 'ced6961d-ec2e-4743-ac48-7f42afbb43be',
    'base_price': 9760,
    'date_from': '2025-05-13T00:06:13.819Z',
    'date_to': '2025-05-14T01:45:13.819Z',
    'destination': '48169512-42de-4055-9795-1c558e1ce105',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '0f22219b-995f-4dd0-9e5d-dae9b167722c',
    'base_price': 1079,
    'date_from': '2025-05-14T12:51:13.819Z',
    'date_to': '2025-05-16T05:27:13.819Z',
    'destination': 'af5330f9-30e7-47de-817a-6b03f15e0981',
    'is_favorite': true,
    'offers': [
      'd6a0c460-40db-4d2d-b655-d96d7f1c3537',
      '3bd4f2e7-1b49-474b-bb1b-623ebb417c4c',
      '5f72ff8d-7797-4f10-8bdc-c57196d6b47b'
    ],
    'type': 'train'
  },
  {
    'id': '627e05e2-c833-453a-91fb-c243ff44d776',
    'base_price': 9800,
    'date_from': '2025-05-16T21:50:13.819Z',
    'date_to': '2025-05-18T04:01:13.819Z',
    'destination': '47006bd6-170a-41a7-a545-7d5d8787ee4c',
    'is_favorite': true,
    'offers': [
      '5106ed7f-bfed-46b5-b742-4f4cbfdbed17',
      '24f8abbc-9789-4e1c-a044-7326b58a5fdc',
      'ca4b6bdf-1760-4cf4-8a62-45833daac5b8',
      '1422353c-bb8c-439c-9778-187f352f7d3b'
    ],
    'type': 'taxi'
  },
  {
    'id': '6b8cee12-4f92-493b-bf0c-599310773f74',
    'base_price': 4324,
    'date_from': '2025-05-19T00:49:13.819Z',
    'date_to': '2025-05-19T12:06:13.819Z',
    'destination': '2821d2a8-15a8-465a-a558-1f5d7bde8550',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '8802890c-5df7-4fe9-96cb-d7fb5cfb934b',
    'base_price': 3485,
    'date_from': '2025-05-20T03:34:13.819Z',
    'date_to': '2025-05-21T22:39:13.819Z',
    'destination': 'f0e7a74a-f073-4bb7-b287-45cf5eddba7b',
    'is_favorite': false,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': '143fd30b-2ea3-4457-8e0e-5254e054f8b9',
    'base_price': 4001,
    'date_from': '2025-05-23T16:40:13.819Z',
    'date_to': '2025-05-24T05:04:13.819Z',
    'destination': '9023acec-5459-47ce-8c0e-27193e8f574d',
    'is_favorite': true,
    'offers': [
      'd89824ba-d763-48d4-b0e0-131223f6c091',
      '1971d30d-4b6f-4a2d-840d-63702714850e'
    ],
    'type': 'ship'
  },
  {
    'id': 'ac2beb2e-81f2-4440-9ab1-416574ffadb5',
    'base_price': 5025,
    'date_from': '2025-05-24T16:53:13.819Z',
    'date_to': '2025-05-25T08:51:13.819Z',
    'destination': 'afdd2a6d-74d9-4adc-af9d-e9f6db49639e',
    'is_favorite': true,
    'offers': [
      '50d63926-978e-422f-b82f-67154f078c33'
    ],
    'type': 'drive'
  },
  {
    'id': '4c380ede-12e7-400d-ab1e-7fa3396c3f45',
    'base_price': 9118,
    'date_from': '2025-05-27T06:36:13.819Z',
    'date_to': '2025-05-29T02:46:13.819Z',
    'destination': '9023acec-5459-47ce-8c0e-27193e8f574d',
    'is_favorite': true,
    'offers': [
      '28f91e16-6ec3-40c2-8db6-ec2ed30feca9',
      '2d530d01-582e-4e33-b608-bfa597e2f70c',
      '6c676bab-1218-4a2a-8fa7-083be176626e'
    ],
    'type': 'flight'
  },
  {
    'id': '27c4881d-ab16-4351-a2f2-08cfb09a71b7',
    'base_price': 8868,
    'date_from': '2025-05-29T22:13:13.819Z',
    'date_to': '2025-05-30T20:04:13.819Z',
    'destination': '2821d2a8-15a8-465a-a558-1f5d7bde8550',
    'is_favorite': true,
    'offers': [],
    'type': 'check-in'
  },
  {
    'id': '21df5271-2b8e-4f73-9daa-5f1adf098288',
    'base_price': 4058,
    'date_from': '2025-05-31T05:41:13.819Z',
    'date_to': '2025-06-01T13:46:13.819Z',
    'destination': 'afd4eadc-4c13-43d1-a7f9-6484f5df0063',
    'is_favorite': false,
    'offers': [
      '2d530d01-582e-4e33-b608-bfa597e2f70c',
      '6c676bab-1218-4a2a-8fa7-083be176626e'
    ],
    'type': 'flight'
  },
  {
    'id': 'cf78149e-61bd-4199-bf70-5bf10214b3f3',
    'base_price': 4160,
    'date_from': '2025-06-02T12:09:13.819Z',
    'date_to': '2025-06-03T05:55:13.819Z',
    'destination': '655e296e-4c22-46af-9f21-dd23fcd047dd',
    'is_favorite': true,
    'offers': [
      'c1f94af8-2cae-49d8-8644-dfa892bc6bab',
      '94ad81bb-408c-45dc-b4e2-04d1150873ab',
      '11275eac-503f-448f-8024-a7d0ac9ec748'
    ],
    'type': 'check-in'
  },
  {
    'id': '8ac908b0-515e-45d5-99ef-8b9bf16224ff',
    'base_price': 6114,
    'date_from': '2025-06-03T14:23:13.819Z',
    'date_to': '2025-06-04T23:45:13.819Z',
    'destination': 'afdd2a6d-74d9-4adc-af9d-e9f6db49639e',
    'is_favorite': false,
    'offers': [
      '2d530d01-582e-4e33-b608-bfa597e2f70c',
      '6c676bab-1218-4a2a-8fa7-083be176626e'
    ],
    'type': 'flight'
  },
  {
    'id': 'b704f088-f0b6-4562-b1d5-2debdea6c28d',
    'base_price': 3526,
    'date_from': '2025-06-06T07:46:13.819Z',
    'date_to': '2025-06-07T09:23:13.819Z',
    'destination': 'f14b9aa5-eb21-49b5-8354-db6b1dc5538e',
    'is_favorite': false,
    'offers': [
      '8b59f7bc-65bc-443f-ad13-79257b8f13f7'
    ],
    'type': 'restaurant'
  },
  {
    'id': '75a19bed-4cff-4d31-a20c-1a38f0f2af9b',
    'base_price': 2102,
    'date_from': '2025-06-08T01:10:13.819Z',
    'date_to': '2025-06-08T17:37:13.819Z',
    'destination': '9023acec-5459-47ce-8c0e-27193e8f574d',
    'is_favorite': true,
    'offers': [],
    'type': 'bus'
  },
  {
    'id': 'b8cacd15-f268-4530-b893-868de4b56400',
    'base_price': 8560,
    'date_from': '2025-06-09T00:03:13.819Z',
    'date_to': '2025-06-09T08:19:13.819Z',
    'destination': '48169512-42de-4055-9795-1c558e1ce105',
    'is_favorite': false,
    'offers': [],
    'type': 'check-in'
  },
  {
    'id': '7b1b906c-bf75-4241-b713-c3d9e8a0d3cf',
    'base_price': 5322,
    'date_from': '2025-06-10T11:41:13.819Z',
    'date_to': '2025-06-11T17:15:13.819Z',
    'destination': '47006bd6-170a-41a7-a545-7d5d8787ee4c',
    'is_favorite': false,
    'offers': [
      '94ad81bb-408c-45dc-b4e2-04d1150873ab',
      '11275eac-503f-448f-8024-a7d0ac9ec748'
    ],
    'type': 'check-in'
  },
  {
    'id': 'd4d50d99-1ae5-4487-9f58-676b11b78470',
    'base_price': 2978,
    'date_from': '2025-06-13T08:13:13.819Z',
    'date_to': '2025-06-13T22:27:13.819Z',
    'destination': '48169512-42de-4055-9795-1c558e1ce105',
    'is_favorite': true,
    'offers': [
      '50d63926-978e-422f-b82f-67154f078c33'
    ],
    'type': 'drive'
  }
];

const getRandomPoint = () => getRandomArrayElement(mockPoints);


export {getRandomPoint};
