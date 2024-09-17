package com.gupi;

import com.skywon.gupi.GupiApplication;

import com.skywon.gupi.entity.Device;
import com.skywon.gupi.security.SecurityConfig;
import com.skywon.gupi.service.DeviceService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Profile;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = {GupiApplication.class, SecurityConfigTest.class})
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class DeviceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DeviceService deviceService;

    @Test
    @WithMockUser(username = "test", roles = "ADMIN")
    public void testGetDevices() throws Exception {
        List<Device> devices = Arrays.asList(new Device(), new Device());
        when(deviceService.getAllDevice()).thenReturn(devices);

        mockMvc.perform(get("/api/device"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.length()").value(2));

        verify(deviceService).getAllDevice();
    }

    @Test
    @WithMockUser(username = "test", roles = "ADMIN")
    public void testAddDevice() throws Exception {
        Device device = new Device();
        when(deviceService.save(any(Device.class))).thenReturn(device);

        mockMvc.perform(post("/api/device")
               .contentType(MediaType.APPLICATION_JSON)
               .content("{}"))
               .andExpect(status().isOk());

        verify(deviceService).save(any(Device.class));
    }

    @Test
    @WithMockUser(username = "test", roles = "ADMIN")
    public void testGetDevicesByUserId() throws Exception {
        List<Device> devices = Arrays.asList(new Device(), new Device());
        when(deviceService.getDevicesByUserId(1)).thenReturn(devices);

        mockMvc.perform(get("/api/device/user/1"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.length()").value(2));

        verify(deviceService).getDevicesByUserId(1);
    }
}