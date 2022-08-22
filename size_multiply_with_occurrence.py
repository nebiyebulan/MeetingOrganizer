

def find_max(t, z):
    res = [t[i: j] for i in range(len(t))
           for j in range(i + 1, len(t) + 1)]
    print(res)
    unique_list = set(res)
    for sub in unique_list:
        count = z.count(sub)
        if count != 0:
            a = len(sub) * count
            print("{} is a substring of t, and it occurs {} times in Z, len({}) x {} = {} is the solution".format(sub, count, sub, count, a))

    return res

if __name__ == '__main__':
        find_max("acldm1labcdhsnd","shabcdacasklksjabcdfueuabcdfhsndsabcdmdabcdfa")

