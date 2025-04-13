#include <bits/stdc++.h>
using namespace std;
#define ll long long

int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        //test case 1
        unordered_map<char, int> tr = {
            {'A', 2000},
            {'B', 800},
            {'C', 1200},
            {'D', 1000},
            {'E', 500},
            {'F', 1600},
            {'G', 900},
        };
        //test case 2
        // unordered_map<char, int> tr = {
        //     {'A', 1000},
        //     {'B', 500},
        //     {'C', 700}
        // };
        int sum = 0;
        for (const auto &pair : tr)
        {
            sum += pair.second;
        }
        double pershare = (double)sum / tr.size();
        map<double, char, greater<double>> deb;
        map<double, char, greater<double>> cred;
        for (const auto &pair : tr)
        {
            auto it = pair.second;
            if (it > pershare)
            {
                double amt = (double)it - pershare;
                cred[amt] = pair.first;
            }
            if (it < pershare)
            {
                double amt2 = (double)pershare - it;
                deb[amt2] = pair.first;
            }
            // else goes to transaction with amount 0
        }

        // printing deb and cred
        for (const auto &pair : deb)
            cout << pair.first << " " << pair.second << endl;
        cout << endl;
        for (const auto &pair : cred)
            cout << pair.first << " " << pair.second << endl;
        cout << endl;
        // logic continues

        vector<pair<double, char>> debv;
        vector<pair<double, char>> credv;

        for (const auto &pair : deb)
            debv.push_back({pair.first, pair.second});
        for (const auto &pair : cred)
            credv.push_back({pair.first, pair.second});

        vector<pair<char, pair<char, double>>> result;

        auto it1 = debv.begin();
        auto it2 = credv.begin();

        while (it1 != debv.end() && it2 != credv.end())
        {
            if (it1->first <= it2->first)
            {
                result.push_back({it1->second, {it2->second, it1->first}});
                double diff = abs(it1->first - it2->first);
                it2->first = diff;
                ++it1;
            }
            else
            {
                result.push_back({it1->second, {it2->second, it2->first}});
                double diff1 = abs(it1->first - it2->first);
                it1->first = diff1;
                ++it2;
            }
        }

        // Step 3: Print the result checking of transactions
        for (const auto &entry : result)
        {
            cout << entry.first << " pays " << entry.second.second << " to " << entry.second.first << endl;
        }

        return 0;
    }
}
