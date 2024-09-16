import {Linking} from 'react-native';
import {ErrorType, crashLogType} from './types';
import {IMessage} from 'react-native-gifted-chat';

/**
 * If you're using Crashlytics: https://rnfirebase.io/crashlytics/usage
 */
// import crashlytics from '@react-native-firebase/crashlytics';

// import {Platform} from 'react-native';

export class CommonUtils {
  /**
   * Manually report a handled error.
   */
  crashLogs = ({filename, functionName, error, errorType = ErrorType.FATAL}: crashLogType): void => {
    if (__DEV__ || process.env.NODE_ENV === 'development') {
      console.log(`${filename} => ${functionName} ===> ${error}`, error);
      if (error instanceof Error) {
        const message = `${filename} => ${functionName} ====> ${error.message}`;
        console.log(message, errorType);
      }
    } else {
      // crashlytics().recordError(error);
    }
  };

  /**
   * Helper for opening a give URL in an external browser.
   */
  openLinkInBrowser = (url: string): void => {
    Linking.canOpenURL(url).then(canOpen => canOpen && Linking.openURL(url));
  };

  /*
   ** Get unique object make array into object key value pair key would be the id
   */
  getUniqueObject = <T extends Record<string, unknown>>(data: T[] = [], keyName: keyof T = ''): Record<string, T> => {
    const newData: Record<string, T> = {};
    data.forEach(item => {
      if (keyName in item) {
        newData[String(item[keyName])] = {...item};
      }
    });
    return newData;
  };

  /*
   ** Shuffle arrays
   */
  shuffleArray = <Type>(array: Type[]): Type[] => {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  /*
   **Get unique array - remove duplicates
   */
  uniqueArray = <T>(array: T[]): T[] => {
    return array.filter((v, i, a) => a.indexOf(v) === i);
  };

  /*
   ** Avg calculation of rating
   */
  calculateAvgRating = <T extends number>(newRating: T, totalReviewerUsers: T, oldRating: T): string => {
    let temp = oldRating * totalReviewerUsers + newRating;
    temp = temp / (totalReviewerUsers + 1);
    return temp.toPrecision(2);
  };

  /*
   ** Send email
   */
  sendEmail = async (subject: string, body: string, recipientEmail: string) => {
    try {
      // Construct the mailto URL
      const url = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

      // Check if the device can open the URL
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) {
        throw new Error('Unable to open email client. Please check your email configuration.');
      }

      // Open the email client with the constructed URL
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  };
  // format message to save into local state variable

  formatIncomingMessage = (message: IMessage, convName = ''): IMessage => {
    if (message.body.type === 'txt') {
      return {
        createdAt: new Date(),
        msgType: 'text',
        text: message?.body?.content,
        conversationId: message.conversationId,
        user: {
          _id: message?.from,
          name: convName,
        },
        _id: message?.msgId,
      };
    } else if (message.body.type === 'img') {
      return {
        createdAt: new Date(message.serverTime),
        text: '',
        msgType: 'image',
        user: {
          _id: message?.from?.toLowerCase(),
          name: convName,
        },
        image: message.body.remotePath,
        conversationId: message.conversationId,
        _id: message?.msgId,
      };
    } else if (message.body.type === 'custom' && message.body.event === 'USER_TEXT_MESSAGE') {
      return {
        createdAt: new Date(message.body.params.createdAt),
        msgType: 'txt',
        text: message?.body?.params?.message,
        user: {
          _id: message?.from?.toLowerCase(),
          name: convName,
        },
        conversationId: message.conversationId,
        _id: message?.msgId,
      };
    } else if (message.body.type === 'custom' && message.body.event === 'BLOCK_USER') {
      return {
        createdAt: new Date(message.body.params.createdAt),
        msgType: 'blockEvent',
        text: message?.body?.params?.message,
        user: {
          _id: message?.from?.toLowerCase(),
          name: convName,
        },
        conversationId: message.conversationId,
        _id: message?.msgId,
      };
    } else if (message.body.type === 'custom' && message.body.event === 'UNBLOCK_USER') {
      return {
        createdAt: new Date(message.body.params.createdAt),
        msgType: 'unBlockEvent',
        text: message?.body?.params?.message,
        user: {
          _id: message?.from?.toLowerCase(),
          name: convName,
        },
        conversationId: message.conversationId,
        _id: message?.msgId,
      };
    } else if (message.body.type === 'custom' && message.body.event === 'USER_AUDIO_CALL_EVENT') {
      return {
        createdAt: new Date(message.body.params.createdAt),
        msgType: 'audioCallMessage',
        text: '',
        user: {
          _id: message?.from?.toLowerCase(),
          name: convName,
        },
        conversationId: message.conversationId,
        _id: message?.msgId,
      };
    } else if (message.body.type === 'custom' && message.body.event === 'USER_VIDEO_CALL_EVENT') {
      return {
        createdAt: new Date(message.body.params.createdAt),
        msgType: 'videoCallMessage',
        text: '',
        user: {
          _id: message?.from?.toLowerCase(),
          name: convName,
        },
        conversationId: message.conversationId,
        _id: message?.msgId,
      };
    } else if (message.body.type === 'file') {
      return {
        createdAt: new Date(message.serverTime),
        text: '',
        msgType: 'file',
        fileName: message.body.displayName,
        remoteUrl: message.body.remotePath,
        user: {
          _id: message?.from?.toLowerCase(),
          name: convName,
        },
        image: '',
        conversationId: message.conversationId,
        _id: message?.msgId,
      };
    } else if (message.body.type === 'video') {
      return {
        createdAt: new Date(message.serverTime),
        text: '',
        msgType: 'video',
        fileName: message?.body?.displayName,
        remoteUrl: message?.body?.remotePath,
        user: {
          _id: message?.from?.toLowerCase(),
          name: convName,
        },
        video: message?.body?.remotePath,
        videoThumbnail: message?.body?.thumbnailRemotePath,
        conversationId: message.conversationId,
        _id: message?.msgId,
      };
    } else {
      return {
        createdAt: new Date(message.serverTime),
        text: message?.body?.content,
        msgType: 'text',
        user: {
          _id: message?.from,
          name: convName,
        },
        _id: message?.msgId,
        conversationId: message.conversationId,
      };
    }
  };
}

// you need to install rnfetch blob in order to make these funnction working
// export class reactNativeFileManupilation {
//   constructor() {
//     // console.log('reactNativeFileManuiplation constructor called');
//   }
//   // //File download
//   // downloadFile = async (url = '', titleName = '') => {
//   //   console.log('url', url);
//   //   console.log('title', titleName);
//   //   // geneting random string
//   //   let randomString = (Math.random() + 1).toString(36).substring(7);
//   //   try {
//   //     // constant
//   //     // const filePath = `${getDirectoryPath(true)}/${randomString}/${titleName}`;
//   //     let filePath: string;
//   //     if (Platform.OS === 'android') {
//   //       filePath = `${getDirectoryPath(true)}/${randomString}/${titleName}`;
//   //     } else {
//   //       filePath = `${getDirectoryPath(true)}/${titleName}`;
//   //     }
//   //     console.log('filePath is ', filePath);
//   //     RNFetchBlob.config({
//   //       fileCache: true,
//   //       path: filePath,
//   //     })
//   //       .fetch('GET', url)
//   //       .progress({interval: 100000}, recieved => {
//   //         Toast.show('Downloading file...', Toast.LONG);
//   //         console.log('this is data is recieving', recieved);
//   //       })
//   //       .then(async res => {
//   //         console.log('RESPONSE [DOWNLOAD_FILE]', res);
//   //         Toast.show('File downloaded', Toast.LONG);
//   //         if (Platform.OS === 'ios') {
//   //           RNFetchBlob.fs.writeFile(filePath, res.data, 'base64');
//   //           RNFetchBlob.ios.previewDocument(filePath);
//   //         }
//   //       })
//   //       .catch(error => {
//   //         Toast.show('Unable to donwload file try again later', Toast.LONG);
//   //         crashLogs({
//   //           error: error,
//   //           filename: 'utils',
//   //           functionName: 'downloadFile',
//   //         });
//   //       });
//   //   } catch (error) {
//   //     console.log('ERROR[DOWNLOAD_FILE]');
//   //     crashLogs({
//   //       error: error,
//   //       filename: 'utils',
//   //       functionName: 'downloadFile',
//   //     });
//   //     // Toast.show("Unable to download file");
//   //   }
//   // };
//   // // Get Directory path
//   // protected getDirectoryPath = (iOSDownload = false) => {
//   //   let directory = RNFetchBlob.fs.dirs.DownloadDir;
//   //   if (Platform.OS === 'ios') {
//   //     directory = iOSDownload
//   //       ? RNFetchBlob.fs.dirs.DocumentDir
//   //       : 'file://' + RNFetchBlob.fs.dirs.DocumentDir;
//   //   }
//   //   return `${directory}`;
//   // };
// }
