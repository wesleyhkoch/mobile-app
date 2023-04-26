import React, { useState } from 'react'
import {
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  ToastAndroid,
} from 'react-native'

import { Button } from '../Button'

import {
  ModalContainer,
  ModalView,
  ModalTouchableOpacity,
  ModalTextInput,
  FormView,
} from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface DeliveryInformationsProps {
  country: string
  state: string
  city: string
  neighborhood: string
  address: string
  complement: string
}

interface ModalProps {
  openModalButton: JSX.Element
  deliveryInformations: (e: DeliveryInformationsProps) => void
}

export const ModalComponent = ({ openModalButton, deliveryInformations }: ModalProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [informations, setInformations] = useState<DeliveryInformationsProps>({
    country: '',
    state: '',
    city: '',
    neighborhood: '',
    address: '',
    complement: '',
  })

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <ModalTouchableOpacity activeOpacity={1} onPressOut={() => setModalVisible(false)}>
            <ScrollView
              style={{ width: '100%' }}
              contentContainerStyle={{ width: '100%', flex: 1, justifyContent: 'center' }}
              directionalLockEnabled={true}
            >
              <View>
                <TouchableWithoutFeedback>
                  <ModalView>
                    <FormView>
                      <ModalTextInput
                        placeholder="País"
                        onChangeText={(e) => setInformations({ ...informations, country: e })}
                      />
                      <ModalTextInput
                        placeholder="UF"
                        onChangeText={(e) => setInformations({ ...informations, state: e })}
                      />
                      <ModalTextInput
                        placeholder="Cidade"
                        onChangeText={(e) => setInformations({ ...informations, city: e })}
                      />
                      <ModalTextInput
                        placeholder="Bairro"
                        onChangeText={(e) => setInformations({ ...informations, neighborhood: e })}
                      />
                      <ModalTextInput
                        placeholder="Endereço"
                        onChangeText={(e) => setInformations({ ...informations, address: e })}
                      />
                      <ModalTextInput
                        placeholder="Complemento"
                        onChangeText={(e) => setInformations({ ...informations, complement: e })}
                      />
                      <Button
                        title="Mudar endereço"
                        onPress={() => {
                          deliveryInformations(informations)
                          setModalVisible(false)
                        }}
                      />
                    </FormView>
                  </ModalView>
                </TouchableWithoutFeedback>
              </View>
            </ScrollView>
          </ModalTouchableOpacity>
        </ModalContainer>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>{openModalButton}</Pressable>
    </View>
  )
}
