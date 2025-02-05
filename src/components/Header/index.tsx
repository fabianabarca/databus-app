import {View, Image} from 'react-native';
import {HeaderStyles} from './styles';
import {IconButton, Text} from 'react-native-paper';

type Header = {
  driverName?: string;
  onButtonClick?: () => void;
  variant?: '1' | '2' | '3';
  hasBackButton?: boolean;
  pageTitle?: string;
};

const Header = ({
  driverName,
  onButtonClick,
  variant,
  hasBackButton,
  pageTitle,
}: Header) => {
  return (
    <>
      {variant === '1' && (
        <View style={HeaderStyles.header}>
          <View>
            <Text style={HeaderStyles.hola}>Hola,</Text>
            <Text style={HeaderStyles.driverName}>{driverName}</Text>
          </View>
          <IconButton
            icon="logout"
            iconColor="#E1E1E6"
            onPress={onButtonClick}
          />
        </View>
      )}

      {variant === '2' && (
        <View style={HeaderStyles.headerVariant}>
          {hasBackButton && (
            <IconButton
              icon="chevron-left"
              iconColor="#E1E1E6"
              onPress={onButtonClick}
              size={30}
            />
          )}
          <Text
            style={
              hasBackButton
                ? HeaderStyles.hola
                : {
                    ...HeaderStyles.hola,
                    flex: 1,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginLeft: 40,
                  }
            }
          >
            {pageTitle}
          </Text>
          <Image source={require('@assets/images/b_blanco.png')} />
        </View>
      )}
      {variant === '3' && (
        <View style={HeaderStyles.headerVariantRight}>
          {hasBackButton && (
            <IconButton
              icon="chevron-left"
              iconColor="#E1E1E6"
              onPress={onButtonClick}
              size={30}
            />
          )}
          <Text
            style={
              hasBackButton
                ? HeaderStyles.hola
                : {
                    ...HeaderStyles.hola,
                    flex: 1,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }
            }
          >
            {pageTitle}
          </Text>
        </View>
      )}
    </>
  );
};

export default Header;
