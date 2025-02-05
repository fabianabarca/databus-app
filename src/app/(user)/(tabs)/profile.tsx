import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {HomeStyles as S} from '@/styles/home';
import Header from '@/components/Header';
import {StatusBar} from 'expo-status-bar';
import {List, Text} from 'react-native-paper';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {Button} from 'react-native-paper';

import {useAuth} from '@/providers/AuthProvider';
import {Colors} from '@constants/Colors';
import {useState} from 'react';

import AutocompleteTextInput from '@components/AutoCompleteTextInput';
import {RadioButtonContext} from 'react-native-paper/lib/typescript/components/RadioButton/RadioButtonGroup';

const ProfileDataField = ({label, value}: {label: string; value: string}) => {
  const styles = useStyles();
  return (
    <View style={styles.profileDataFieldContainer}>
      <Text style={styles.dataFieldLabel}>{label}</Text>
      <Text style={styles.dataFieldValue}>{value}</Text>
    </View>
  );
};

const UserPictureComponent = ({
  name,
  picture,
}: {
  name: string;
  picture: string;
}) => {
  const styles = useStyles();
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profilePictureContainer}>
        <MaterialCommunityIcons
          name="account-circle"
          size={150}
          color="black"
        />
        <View style={styles.nameRow}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      </View>
    </View>
  );
};

const AccordionWithArrow = () => {
  const [expanded, setExpanded] = useState(false);

  const styles = useStyles();
  return (
    <List.Accordion
      title="Agencia"
      left={props => <List.Icon {...props} icon="" />}
      right={props => (
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color="black"
          style={{transform: [{rotate: expanded ? '0deg' : '270deg'}]}}
        />
      )}
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      style={styles.list}
    >
      <List.Item title="First item" />
      <List.Item title="Second item" />
    </List.Accordion>
  );
};

const ProfileScreen = () => {
  const {user, logOut} = useAuth();
  const styles = useStyles();

  const name = `${user?.first_name} ${user?.last_name}`;

  const handleConfirmChanges = () => {
    console.log('Changes in user');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={S.container}>
        <StatusBar style="light" />
        <Header pageTitle="Perfil" variant="3" />
        <View style={styles.square} />

        <UserPictureComponent name={name} picture="" />

        <View style={styles.contentContainer}>
          <View style={styles.profileDataContainer}>
            <ProfileDataField label="Cédula" value={user?.operator_id} />
            <ProfileDataField label="Teléfono" value={user?.operator_id} />
          </View>

          <View style={styles.inputContainer}>
            <AccordionWithArrow />
            <AutocompleteTextInput
              label="Vehículo"
              suggestions={['UCR-123', 'UCR-321']}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonConfirmChanges}
            onPress={handleConfirmChanges}
          >
            <Text style={styles.buttonText}>Confirmar Cambios</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonLogOut} onPress={logOut}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;

const useStyles = () => {
  return StyleSheet.create({
    contentContainer: {
      width: '100%',
      height: '100%',
      borderTopRightRadius: 24,
      paddingTop: 125,
      backgroundColor: Colors.light.background,
      alignItems: 'center',
    },
    profileDataContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 30,
      width: '100%',
      height: 50,
    },
    profileDataFieldContainer: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      width: '30%',
    },
    square: {
      position: 'absolute',
      right: 0,
      top: '15%',
      width: 100,
      height: 100,
      backgroundColor: Colors.primaryColor,
      zIndex: 0,
    },
    profileContainer: {
      position: 'absolute',
      // right: 0,
      top: 0,
      marginTop: 85,
      width: 200,
      height: 170,
      marginHorizontal: 'auto',
      borderRadius: 0,
      zIndex: 5,
      // backgroundColor: 'red',
      alignContent: 'center',
      // justifyContent: 'center',
    },
    profilePictureContainer: {
      width: 150,
      height: undefined,
      aspectRatio: 1,
      borderRadius: 100,
      backgroundColor: Colors.notFocusColor,
      alignSelf: 'center',
    },
    nameText: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 20,
    },
    nameRow: {
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      marginTop: 10,
      width: 200,
      // backgroundColor: 'yellow',
    },
    dataFieldLabel: {
      color: Colors.primaryColor,
      fontWeight: 'bold',
      fontSize: 15,
    },
    dataFieldValue: {
      fontSize: 15,
    },
    buttonConfirmChanges: {
      width: 200,
      height: 56,
      borderRadius: 100,
      backgroundColor: Colors.secondaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
    },
    buttonLogOut: {
      width: 380,
      height: 56,
      borderRadius: 100,
      marginTop: 'auto',
      marginBottom: 150,
      backgroundColor: Colors.primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white',
    },
    inputContainer: {
      width: '90%',
      marginTop: 50,
    },
    list: {
      borderBottomWidth: 1,
      borderColor: 'grey',
    },
  });
};
