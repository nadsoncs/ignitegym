import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { ScrollView, Center, Skeleton, VStack, Text, Heading, useToast } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from '@components/ScreenHeader';
import { Avatar } from '@components/Avatar';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/nadsoncs.png')
  const toast = useToast();
  
  async function handleUserPhotoSelect() {
    try {
      setPhotoIsLoading(true);
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        selectionLimit: 1,
      });
  
      if (photoSelected.canceled  ) {
        return;
      } else {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
        console.log(photoInfo);

        if( photoInfo.exists && (photoInfo.size / 1024 / 1024 > 5)) {
          return toast.show({
            title: "Essa imagem é muito grande, escolha uma menor que 5MB",
            placement: 'top',
            bgColor: 'red.500'
          })
        }
        setUserPhoto(photoSelected.assets[0].uri )
      }    
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }

  }
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil"/>

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}  >
        <Center mt={6} px={10}>
          {
            photoIsLoading ? 
              <Skeleton 
                w={PHOTO_SIZE} 
                h={PHOTO_SIZE} 
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
            : 
              <Avatar
                source={{ uri: userPhoto }}
                alt="Foto de perfil"
                size={PHOTO_SIZE}
              />
          }
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            bg="gray.600"
            placeholder="Nome"
          />
          <Input
            bg="gray.600"
            value="nadsoncerqueira@gmail.com"
            isDisabled
          />

          <Heading color="gray.200" fontSize="md" mt={12} mb={2} alignSelf="flex-start" fontFamily="heading">
            Alterar senha
          </Heading>
          
          <Input
            bg="gray.600"
            placeholder="Senha atual"
            secureTextEntry
          />
          <Input
            bg="gray.600"
            placeholder="Nova senha"
            secureTextEntry
          />
          <Input
            bg="gray.600"
            placeholder="Confirmar nova senha"
            secureTextEntry
          />
          <Button
            title="Atualizar"
            mt={4}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}