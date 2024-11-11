import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export const ShopContext = createContext(null);
const URI = ""