import React, {useState} from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Box, Stack, FormControl, ScrollView, Text, Divider, WarningOutlineIcon, TextArea } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


export default function EditTravelPlan() {

    const [media, setMedia] = useState([]);

    return (
        <ScrollView w="100%">
      <Stack space={2.5} alignSelf="center" px="4" safeArea w={{
      base: "100%",
      md: "25%"
    }}>
        <Box>
          <FormControl mb="1" isRequired>
            <FormControl.Label>Title</FormControl.Label>
            <Input />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                This field is required
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>
        <Box>
            <FormControl mb="1">

            </FormControl>
        </Box>
          <FormControl mb="1" isRequired>
            <FormControl.Label>Description</FormControl.Label>
            <TextArea autoCompleteType h={200} />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                This field is required
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>
      </Stack>
    </ScrollView>)
}