import { renderHook, act } from '@testing-library/react-hooks';
import {
  useStorageState,
  useSessionStorageState,
  useLocalStorageState,
} from '../src/useStorageState';
import { isServer } from '../src/util';

jest.mock('../src/util', () => {
  const isServerMock = jest.fn();
  isServerMock.mockReturnValue(false);
  return {
    isServer: isServerMock,
  };
});

const setSSRState = (value: boolean) =>
  (isServer as any).mockReturnValue(value);

const STORAGE_KEY = 'myBoolean';
const STORAGE_VALUE = 0;

const renderUseStorageHook = () =>
  renderHook(() => useStorageState(STORAGE_KEY, STORAGE_VALUE, localStorage));

const renderUseSessionStorageHook = () =>
  renderHook(() => useSessionStorageState(STORAGE_KEY, STORAGE_VALUE));

const renderUseLocalStorageHook = () =>
  renderHook(() => useLocalStorageState(STORAGE_KEY, STORAGE_VALUE));
describe('useStorageState', () => {
  afterEach(() => {
    setSSRState(false);
    localStorage.clear();
    sessionStorage.clear();
    (localStorage.setItem as any).mockClear();
    (sessionStorage.setItem as any).mockClear();
    (localStorage.getItem as any).mockClear();
    (sessionStorage.getItem as any).mockClear();
  });

  it('should return the initial value', () => {
    const { result } = renderUseStorageHook();
    const [value, setValue] = result.current;
    expect(value).toEqual(0);
    expect(typeof setValue).toBe('function');
  });

  it('should return the new value after using setValue', () => {
    const { result } = renderUseStorageHook();
    act(() => {
      result.current[1](5);
    });
    expect(result.current[0]).toEqual(5);
  });

  describe('useSessionStorageState', () => {
    it('should store the initial value in sessionStorage', () => {
      const { result } = renderUseSessionStorageHook();
      const [value] = result.current;
      expect(sessionStorage.getItem(STORAGE_KEY)).toEqual(value.toString());
    });

    it('should store an updated value in sessionStorage', () => {
      const { result } = renderUseSessionStorageHook();
      act(() => {
        result.current[1](5);
      });
      expect(sessionStorage.setItem).toHaveBeenLastCalledWith(STORAGE_KEY, '5');
    });

    it('should always return the default value in SSR', () => {
      setSSRState(true);
      const { result } = renderUseSessionStorageHook();
      act(() => {
        result.current[1](5);
      });
      expect(result.current[0]).toEqual(0);
    });
  });

  describe('useLocalStorageState', () => {
    it('should store the initial value in localStorage', () => {
      renderUseLocalStorageHook();
      expect(localStorage.setItem).toHaveBeenLastCalledWith(STORAGE_KEY, '0');
    });

    it('should store an updated value in localStorage', () => {
      const { result } = renderUseLocalStorageHook();
      act(() => {
        result.current[1](5);
      });
      expect(localStorage.setItem).toHaveBeenLastCalledWith(STORAGE_KEY, '5');
    });

    it('should always return the default value in SSR', () => {
      setSSRState(true);
      const { result } = renderUseLocalStorageHook();
      act(() => {
        result.current[1](5);
      });
      expect(result.current[0]).toEqual(0);
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });
});
