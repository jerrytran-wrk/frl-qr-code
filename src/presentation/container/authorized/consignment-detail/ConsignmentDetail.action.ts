import {ConsignmentDetailStoreApi} from './ConsignmentDetail.type';
import {INITIAL_STATE} from './constants';
import {
  FirestoreConsignmentDataSource,
  FirestoreDistributorDataSource,
  Consignment,
} from '@data';

import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';
import FetchBlob from 'rn-fetch-blob';
//@ts-ignore
import Mailer from 'react-native-mail';

export const ConsignmentDetailActions = {
  reset: () => ({setState}: ConsignmentDetailStoreApi) => {
    setState(INITIAL_STATE);
  },
  load: (id: string) => async ({setState}: ConsignmentDetailStoreApi) => {
    setState({isLoading: true});
    const dDataSource = new FirestoreDistributorDataSource();
    const dataSource = new FirestoreConsignmentDataSource(dDataSource);
    const result = await dataSource.get(id);
    result.do({
      right: (consignment) => {
        setState({consignment});
      },
    });
    setState({isLoading: false});
  },
  save: (data: string, consignment: Consignment) => async ({
    setState,
  }: ConsignmentDetailStoreApi) => {
    try {
      setState({isLoading: true});
      const url = `${FetchBlob.fs.dirs.DCIMDir}/${consignment.id}.png`;
      await RNFS.writeFile(url, data, 'base64');
      await CameraRoll.save(url, {type: 'photo'});
    } catch (error) {
      setState({saveQRError: JSON.stringify(error)});
    } finally {
      setState({isLoading: false});
    }
  },

  share: (consignment: Consignment) => ({
    setState,
  }: ConsignmentDetailStoreApi) => {
    const url = `${FetchBlob.fs.dirs.DCIMDir}/${consignment.id}.png`;
    const onComplete = (error: string) => {
      setState({shareQRError: error});
      RNFS.unlink(url);
    };
    Mailer.mail(
      {
        subject: `QR Code cho sản phẩm ${consignment.name}`,
        recipients: ['support@example.com'],
        body: `
            <b>Tên sản phẩm: ${consignment.name} </b></hr>
            <b>Tên nhà phân phối: ${consignment.distributor?.name} </b></hr>
            <b>Người vận chuyển: ${consignment.shipper} </b></hr>
            <b>Ngày sản xuất: ${consignment.createdDate.toString()} </b></hr>
        `, // Android only (defaults to "Send Mail")
        isHTML: true,
        attachments: [
          {
            path: url, // The absolute path of the file from which to read data.
            type: 'jpg', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            // mimeType - use only if you want to use custom type
            name: `${consignment.name}-QR`, // Optional: Custom filename for attachment
          },
        ],
      },
      onComplete,
    );
  },
};
